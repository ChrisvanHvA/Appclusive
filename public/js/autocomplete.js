const suggestions = new Set();

const getSuggestions = () => {
    const projectHeadings = document.querySelectorAll(
        'li.card__item.allprojects-card .header__title h3'
    );

    projectHeadings.forEach((heading) => {
        const headingWithoutSpan = heading.innerHTML
            .replace(/<span\b[^>]*>(.*?)<\/span>/i, '')
            .trim()
            .toLowerCase();

        suggestions.add(headingWithoutSpan);
    });
};

const currentSuggestions = new Set();
const autocomplete = (e) => {
    const inputValue = e.target.value.toLowerCase().trim();

    for (const suggestion of suggestions) {
        if (suggestion.includes(inputValue)) {
            // if the suggestion is already in the list, just highlight it and continue
            if (currentSuggestions.has(suggestion)) {
                const anchor = suggestionsList.querySelector(
                    `a[href="/search?query=${suggestion}"]`
                );

                const highlightedSuggestion = suggestion.replace(
                    new RegExp(inputValue, 'gi'),
                    '<strong>$&</strong>'
                );
                anchor.innerHTML = highlightedSuggestion;
                continue;
            }

            currentSuggestions.add(suggestion);

            const suggestionListItem = document.createElement('li');
            const anchor = document.createElement('a');
            anchor.setAttribute('href', `/search?query=${suggestion}`);
            anchor.addEventListener('keydown', moveFocus);

            // checks if the input value is in the array item (if yes, highlights it)
            const highlightedSuggestion = suggestion.replace(
                new RegExp(inputValue, 'gi'),
                '<strong>$&</strong>'
            );
            anchor.innerHTML = highlightedSuggestion;

            suggestionListItem.appendChild(anchor);

            // sorts items in the list based on if they start with the input value
            suggestion.startsWith(inputValue)
                ? suggestionsList.insertBefore(
                      suggestionListItem,
                      suggestionsList.childNodes[0]
                  )
                : suggestionsList.appendChild(suggestionListItem);
        } else {
            currentSuggestions.delete(suggestion);
            const suggestionAnchor = suggestionsList.querySelector(
                `li a[href="/search?query=${suggestion}"]`
            );
            const suggestionListItem = suggestionAnchor?.closest('li');
            suggestionListItem?.remove();
        }
    }
};

const moveFocus = (e) => {
    const { key, currentTarget } = e;

    if (key === 'ArrowDown' || key === 'ArrowUp') {
        e.preventDefault();

        const currentListItem = currentTarget.closest('li');

        if (key === 'ArrowUp') {
            const previousAnchor =
                currentListItem.previousElementSibling?.querySelector('a');

            previousAnchor ? previousAnchor.focus() : autocompleteInput.focus();
        } else {
            const nextAnchor =
                currentListItem.nextElementSibling?.querySelector('a');

            nextAnchor?.focus();
        }
    }
};

const focusFirstSuggestion = () => {
    const firstSuggestion = suggestionsList.querySelector('a');

    firstSuggestion?.focus();
};

const toggleSuggestions = (e) => {
    if (
        e.relatedTarget?.closest('section#searchbar') ||
        (e.target.closest('section#searchbar') && e.type !== 'focusout')
    ) {
        suggestionsList.classList.remove('hide');
    } else {
        suggestionsList.classList.add('hide');
    }
};

const searchSection = document.querySelector('section#searchbar');
const autocompleteInput = searchSection?.querySelector('input#search');
const suggestionsList = searchSection?.querySelector('.autocomplete-items');

if (autocompleteInput && suggestionsList) {
    getSuggestions();
    autocompleteInput.addEventListener('input', autocomplete);

    autocompleteInput.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            focusFirstSuggestion();
        }
    });

    searchSection.addEventListener('focusin', toggleSuggestions);
    searchSection.addEventListener('focusout', toggleSuggestions);
}
