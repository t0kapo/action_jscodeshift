const core = require('@actions/core');
const exec = require('@actions/exec');


try {
    const codemod_file = core.getInput('codemod');
    const transform_files = core.getInput('transform');
    const codemod = String(codemod_file); 
    const transforms = String(transform_files);
    exec.exec('npx jscodeshift -t ' + codemod + ' ' + transforms);

} catch (error){
    core.setFailed(error.message);
}