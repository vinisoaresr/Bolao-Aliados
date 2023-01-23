import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

function exportTransactions(transactions) {
  let sorteredTransactions = transactions.sort((a, b) =>
    a.calculed_score < b.calculed_score ? 1 : -1
  );

  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const reportTitle = [
    {
      text: "Transações",
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45], // left, top, right, bottom
    },
  ];

  const data = sorteredTransactions.map((transaction) => {
    let date = transaction.updated
      ? new Date(transaction.updated).toLocaleString("pt-BR")
      : new Date(transaction.created).toLocaleString("pt-BR");
    return [
      {
        text: transaction.id,
        fontSize: 8,
        margin: [0, 2, 0, 2],
        alignment: "center",
      },
      {
        text: date,
        fontSize: 8,
        margin: [0, 2, 0, 2],
        alignment: "center",
      },
      {
        text:
          "Time: " +
          transaction.match.homeTeam.name +
          "\nPalpite: " +
          transaction.goals_homeTeam,
        fontSize: 8,
        margin: [0, 2, 0, 2],
        alignment: "center",
      },
      {
        text:
          "Time: " +
          transaction.match.awayTeam.name +
          "\nPalpite: " +
          transaction.goals_awayTeam,
        fontSize: 8,
        margin: [0, 2, 0, 2],
        alignment: "center",
      },
      {
        text: transaction.calculed_score,
        fontSize: 8,
        margin: [0, 2, 0, 2],
        alignment: "center",
      },
      {
        text: transaction.hash,
        fontSize: 8,
        margin: [0, 2, 0, 2],
        alignment: "center",
      },
    ];
  });

  const details = [
    {
      table: {
        headerRows: 1,
        widths: ["auto", "auto", "auto", "auto", "auto", "auto"],
        body: [
          [
            {
              text: "ID da Transação",
              style: "tableHeader",
              fontSize: 10,
              bold: true,
              alignment: "center",
            },
            {
              text: "Data da Transação",
              style: "tableHeader",
              fontSize: 10,
              bold: true,
              alignment: "center",
            },
            {
              text: "Time Mandante",
              style: "tableHeader",
              fontSize: 10,
              bold: true,
              alignment: "center",
            },
            {
              text: "Time Visitante",
              style: "tableHeader",
              fontSize: 10,
              bold: true,
              alignment: "center",
            },
            {
              text: "Score Obtido",
              style: "tableHeader",
              fontSize: 10,
              bold: true,
              alignment: "center",
            },
            {
              text: "Código Transação",
              style: "tableHeader",
              fontSize: 10,
              bold: true,
              alignment: "center",
            },
          ],
          ...data,
        ],
      },
      layout: "lightHorizontalLines", // headerLineOnly
    },
  ];

  function footer(currentPage, pageCount) {
    return [
      {
        text:
          new Date().toLocaleString("pt-BR") +
          " - " +
          currentPage +
          " / " +
          pageCount,
        alignment: "right",
        fontSize: 9,
        margin: [0, 10, 20, 0], // left, top, right, bottom
      },
    ];
  }

  const docOptions = {
    pageSize: "A4",
    pageMargins: [15, 50, 15, 40],

    header: [reportTitle],
    content: [details],
    footer: footer,
  };

  pdfMake.createPdf(docOptions).open();
}

export default exportTransactions;
