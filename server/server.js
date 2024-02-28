const express = require("express");
const bodyParser = require("body-parser");
const XLSX = require("xlsx");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let arquivo;

app.post("/confirmacao-presenca", (req, res) => {
  const { nome } = req.body;

  try {
    if (fs.existsSync("confirmacao-presenca.xlsx")) {
      const workbookData = fs.readFileSync("confirmacao-presenca.xlsx");
      arquivo = XLSX.read(workbookData, { type: "buffer" });
    } else {
      arquivo = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(
        arquivo,
        XLSX.utils.aoa_to_sheet([["Nome"]]),
        "Presença"
      );
    }
    XLSX.utils.sheet_add_aoa(arquivo.Sheets["Presença"], [[nome]], {
      origin: -1,
    });

    XLSX.writeFile(arquivo, "confirmacao-presenca.xlsx");

    res.send("Presença confirmada e registrada!");
  } catch (error) {
    console.error("Erro ao processar a confirmação de presença:", error);
    res.status(500).send("Erro ao processar a confirmação de presença");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
