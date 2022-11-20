const { l10n } = require("vscode")
const defaultExpression = '([A-Z]+-\\d+)'
const gitURL = 'https://git-scm.com/downloads'

const errors = {
    repoNotFound: l10n.t("A git repo was not found"),
    noMatchingTicket: l10n.t("No Matching Ticket ID found from branch name"),
    genericError: l10n.t(`an Error has occurred`),
    gitErrors: {
        installGitMessage: l10n.t("Please install Git to use this extension"),
        InstallGit: l10n.t("Install Git"),
    }
}
const genericInfoMsg = {
    ok: l10n.t("ok"),
    dismiss: l10n.t("dismiss")
}
const successMsg = {
    activeMsg: l10n.t('Congratulations, Prefixed is now active!'),
    prefixSuccess: ({ ticketID, branch }) => { return l10n.t(`Successfully Prefixed ${ticketID} for branch ${branch}`) },
}
module.exports = {
    defaultExpression,
    gitURL,
    errors,
    successMsg,
    genericInfoMsg
}