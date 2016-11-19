"use strict";
class PDFHandler {

    static generatePDF(title, name, items) {

        const doc = new jsPDF();

        doc.setFontSize(20);

        doc.text(title, 10, 10);

        doc.line(10, 20, 200, 20);

        items.map((item, i) => {

            const offsetX = 20;
            const offsetY = 20 + i * 60;

            doc.text(item.name + " " + item.surname, offsetX, offsetY + 20);
            doc.text(item.cls + " " + item.number + " " + item.sect, offsetX, offsetY + 30);
            doc.text("Mail: " + item.mail, offsetX, offsetY + 40);
            doc.text("Password: " + item.pass, offsetX, offsetY + 50);

            doc.line(10, offsetY + 60, 200, offsetY + 60);
        });

        doc.save(name, ".pdf");
    }


}

export default PDFHandler;
