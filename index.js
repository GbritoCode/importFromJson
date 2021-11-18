const express = require('express')
const app = express()
const port = 30001
const json = require('./teste.json')
app.use(express.json())
const Cli = require('./models/Cliente')
const CliCont = require('./models/CliCont')
const Campanhas_Clientes = require('./models/Campanhas_Clientes')
require('./models/database')

class Queue {
    constructor(maxSimultaneously = 1) {
        this.maxSimultaneously = maxSimultaneously;
        this.__active = 0;
        this.__queue = [];
    }

    /** @param { () => Promise<T> } func 
     * @template T
     * @returns {Promise<T>}
    */
    async enqueue(func) {
        if(++this.__active > this.maxSimultaneously) {
            await new Promise(resolve => this.__queue.push(resolve));
        }

        try {
            return await func();
        } catch(err) {
            throw err;
        } finally {
            this.__active--;
            if(this.__queue.length) {
                this.__queue.shift()();
            }
        }
    }
}

app.get('/', async(req, res) => {

  
})



app.listen(port, async (req, res) => {
    let count = 0

    const clientesDb = await Cli.findAll({attributes:['CNPJ']})
    async function up(record) {
        try {
            // console.log(json);
            
            const cnpjDb = record.CNPJ.replace(/[^\d]+/g, '');
            if(clientesDb.findIndex(arr=>arr.CNPJ === cnpjDb) === -1 && record['NOME ABREVIADO']){
            const foneDb = record.FONE === null ? '9999999999' : record.FONE.replace(/[^\d]+/g, '');
            const contCelDb = record.CELULAR === null ? '99999999999' : record.CELULAR.replace(/[^\d]+/g, '');
            const contFoneDb = record['FONE CONTATO'] === null ? '9999999999' : record['FONE CONTATO'].replace(/[^\d]+/g, '');
  
            const createdCli = await Cli.create({
              CNPJ: cnpjDb,
              nomeAbv: record['NOME ABREVIADO'],
              rzSoc: record['RAZÃO'],
              fantasia: record.NOME_FANTASIA,
              RepresentanteId: 1,
              EmpresaId: 1,
              prospect: true,
              site: record.SITE,
              fone: foneDb,
              ramo: record.RAMO,
              setor: record.SETOR,
            });
            console.log(createdCli.id);
  
            const createdCont = await CliCont.create({
              ClienteId: createdCli.getDataValue('id'),
              nome: record.CONTATOS,
              cel: contCelDb,
              fone: contFoneDb,
              email: record.EMAIL === null ? 'erro@semEmail.na.planilha' : record.EMAIL,
              cargo: record.CARGO,
            });
  
            const camp_cli = await Campanhas_Clientes.create({
              ClienteId: createdCli.getDataValue('id'),
              CampanhaId: 1,
            });
            count+=1
            console.log('contador: ',count)
            await new Promise((res) => setTimeout(res, 20500));
            }
        } catch (err) {
          console.log(err);
          return res.json({ error: 'Erro Interno Do Servidor' });
        }
      }
      const q = new Queue(3);
      for (let i = 0; i < json.length; i++) {
        console.log(json[i]);
        await q.enqueue(() => up(json[i]));
        
    }

//   console.log(`Example app listening at http://localhost:${port}`)
})