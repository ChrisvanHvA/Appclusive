const inviteCodes = document.querySelectorAll('span.code');

inviteCodes.forEach((inviteCode) => {
    inviteCode.addEventListener('click', (e) => {
        e.preventDefault();
        navigator.clipboard
            .writeText(inviteCode.textContent)
            .then(() => {
                console.log('INVITE CODE copied to clipboard');
                inviteCode.setAttribute('data-tooltip', 'copied to clipboard');
                setTimeout(
                    () => inviteCode.setAttribute('data-tooltip', ''),
                    1500
                );
            })
            .catch((err) => {
                console.error('Error copying ROOM ID:', err);
            });
    });
});