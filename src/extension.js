
const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const { defaultExpression, errors, successMsg, gitURL, genericInfoMsg } = require("./constants/common")
	vscode.window.showInformationMessage(successMsg.activeMsg);

	let disposable = vscode.commands.registerCommand('prefixed.prefixTicketID', async function (trigger) {
		try {
			const vscodeGit = vscode.extensions.getExtension('vscode.git');
			const git = vscodeGit.exports.getAPI(1)
			if (!git) {
				const choice = await vscode.window.showWarningMessage(
					errors.gitErrors.installGitMessage,
					errors.gitErrors.InstallGit,
					genericInfoMsg.dismiss
				);
				choice === errors.gitErrors.InstallGit &&
					vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(gitURL));
				throw new Error(errors.repoNotFound)
			}
			const repo = git.repositories.filter((repo) => repo.rootUri.path === trigger.rootUri.path)[0]
			const branch = repo.state.HEAD.name;

			const idRegex = new RegExp(defaultExpression, 'i');
			const matched = idRegex.exec(branch);
			const ticketID = matched ? matched[0] : null;
			if (!ticketID) {
				throw new Error(errors.noMatchingTicket)
			}
			if (!repo.inputBox.value.includes(ticketID)) {
				repo.inputBox.value = `${ticketID} : ${repo.inputBox.value}`;
			}
			vscode.window.showInformationMessage(successMsg.prefixSuccess({ ticketID, branch }), genericInfoMsg.dismiss
			);
		} catch (err) {
			vscode.window.showErrorMessage(err.message ? err.message : errors.genericError);
		}
	});

	context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
