import pdf from "pdf-creator-node"

const options = {
    format: "A3",
    orientation: "portrait",
    border: "10mm",
    header: {
        height: "45mm",
        contents: '<div style="text-align: center; color: blue; font-size:30px; font-weight: bold; padding: 20px 0 20px 0; background: green">Voral</div>'
    },
    footer: {
        height: "28mm",
        contents: '<div style="text-align: center; font-size:22px; font-weight: bold;">Voral</div>'
    }
};

export async function createPdf(document:any){
    try {
        const result = await pdf.create(document, options)
        return result
    } catch (error) {
        return error   
    }
}


