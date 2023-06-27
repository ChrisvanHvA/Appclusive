const copyToClipboard = async (e) => {
    e.preventDefault();

    if (!navigator.clipboard) {
        console.error('Clipboard API not available');
        return;
    }

    const inviteCode = e.currentTarget;
    const textToCopy = inviteCode.textContent;

    try {
        await navigator.clipboard.writeText(textToCopy);
        console.log('INVITE CODE copied to clipboard');
        inviteCode.setAttribute('data-tooltip', 'copied to clipboard');
        setTimeout(() => inviteCode.removeAttribute('data-tooltip'), 1500);
    } catch (err) {
        console.error('Error copying INVITE CODE:', err);
    }
};

const inviteCodes = document.querySelectorAll('button.code');
inviteCodes.forEach((inviteCode) => {
    inviteCode.addEventListener('click', copyToClipboard);
});
