const core = require('@actions/core');
const github = require('@actions/github');
const execSync = require('child_process').execSync;

try {
    console.log('Downloading Azure Cost Estimator.')
    execSync('wget https://github.com/TheCloudTheory/arm-estimator/releases/download/1.5-beta1/linux-x64.zip');
    execSync('unzip -o linux-x64.zip');
    execSync('chmod +x ./azure-cost-estimator');

    console.log('Running Azure Cost Estimator.')
    let command = './azure-cost-estimator';

    if(core.getInput('resource-group-name') && core.getInput('subscription-id')) {
        command += ' ' + core.getInput('template-file') + ' ' + core.getInput('subscription-id') + ' ' + core.getInput('resource-group-name');
    }
    else if(core.getInput('subscription-id') && core.getInput('resource-group-name') == null && core.getInput('location')) {
        command += ' sub ' + core.getInput('template-file') + ' ' + core.getInput('subscription-id') + ' ' + core.getInput('location');
    }
    else if(core.getInput('management-group-id')) {
        command += ' mg ' + core.getInput('template-file') + ' ' + core.getInput('management-group-id');
    }
    else if(core.getInput('tenant-id')) {
        command += ' tenant ' + core.getInput('tenant-id') + ' ' + core.getInput('template-file');
    }
    else {
        throw new Error('Please provide a valid input.');
    }

    if(core.getInput('deployment-mode')) {
        command += ' --mode ' + core.getInput('mode');
    }

    if(core.getInput('threshold')) {
        command += ' --threshold ' + core.getInput('threshold');
    }

    if(core.getInput('parameters-file')) {
        command += ' --parameters ' + core.getInput('parameters-file');
    }

    if(core.getInput('currency')) {
        command += ' --currency ' + core.getInput('currency');
    }

    if(core.getInput('generate-json-output')) {
        command += ' --generateJsonOutput ' + core.getInput('generate-json-output');
    }

    if(core.getInput('silent')) {
        command += ' --silent ' + core.getInput('silent');
    }

    if(core.getInput('stdout')) {
        command += ' --stdout ' + core.getInput('stdout');
    }

    if(core.getInput('disable-detailed-metrics')) {
        command += ' --disableDetailedMetrics ' + core.getInput('disable-detailed-metrics');
    }

    if(core.getInput('json-output-filename')) {
        command += ' --jsonOutputFilename ' + core.getInput('json-output-filename');
    }

    if(core.getInput('generate-html-output')) {
        command += ' --generateHtmlOutput ' + core.getInput('generate-html-output');
    }

    if(core.getInput('output-format')) {
        command += ' --outputFormat ' + core.getInput('output-format');
    }

    if(core.getInput('disable-cache')) {
        command += ' --disable-cache ' + core.getInput('disable-cache');
    }

    if(core.getInput('terraform-executable-path')) {
        command += ' --tf-executable ' + core.getInput('terraform-executable-path');
    }

    if(core.getInput('conversion-rate')) {
        command += ' --conversion-rate ' + core.getInput('conversion-rate');
    }

    if(core.getInput('cache-handler')) {
        command += ' --cache-handler ' + core.getInput('cache-handler');
    }

    if(core.getInput('cache-storage-account-name')) {
        command += ' --cache-storage-account-name ' + core.getInput('cache-storage-account-name');
    }

    if(core.getInput('webhook-url')) {
        command += ' --webhook-url ' + core.getInput('webhook-url');
    }

    if(core.getInput('webhook-authorization')) {
        command += ' --webhook-authorization ' + core.getInput('webhook-authorization');
    }

    if(core.getInput('inline-parameters')) {
        const parameters = JSON.parse(core.getInput('inline-parameters'));
        for (const [key, value] of Object.entries(parameters)) {
            command += ' --inline ' + key + '=' + value;
        }
    }


    const result = execSync(command).toString();
    console.log(result);
} catch (error) {
    core.setFailed(error.message);
}
