const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

/* Ubicamos la carpeta build y la eliminamos */
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

/* Ubicamos el archivo Campaign.sol */
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

/* Compilamos el contrato */
const output = solc.compile(source, 1).contracts;

/* Verificar si no existe la carpeta build, entonces crearlo */
fs.ensureDirSync(buildPath);

console.log(output);
for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json' ), /* Eliminar el : del archivo que genera */
        output[contract]
    );
}