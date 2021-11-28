const core = require('@actions/core');
const exec = require('@actions/exec');
const fs = require("fs");

try {
    const codemod_file = core.getInput('codemod');
    const transform_files = core.getInput('transform');
    const policy_name = core.getInput('policyname');

    const str_codemod = String(codemod_file);
    let js_source = fs.readFileSync(str_codemod,"utf8");
    var js_changed = js_source.replace('mypolicy', policy_name);
    fs.writeFile(codemod_file, js_changed, (err) => {
		if (err) {
			console.log('Failed to add policy name "' + policy_name + '".' + err);
            throw err;
		}else{
			console.log('Add policy name successful!');
		}
	});


    const codemod = String(codemod_file); 
    const transforms = String(transform_files);
    exec.exec('npx jscodeshift -t ' + codemod + ' ' + transforms);
    /*
    exec.exec('sudo chown -R $USER:$USER tt_codemod');
    exec.exec('rm -rf tt_codemod');
    */

} catch (error){
    core.setFailed(error.message);
}