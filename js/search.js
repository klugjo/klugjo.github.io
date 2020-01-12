const anoData = (function () {
    const data = [];

    document.querySelectorAll('.content a.content-link').forEach(elt => {
        const postData = {
            link: elt.href,
            title: elt.querySelector('.content-title').innerText,
            tags: []
        };

        elt.querySelectorAll('.fake-link').forEach(tag => {
            postData.tags.push(tag.innerText);
        });

        postData.data = `${postData.title} ${postData.tags.join(' ')}`;

        data.push(postData);
    });

    const search = (term) => {
        const results = [];
        const terms = term.split(' ');
        data.forEach(d => {
            if (terms.every(t => d.title.indexOf(t) > -1)) {
                results.push(d);
            }
        });

        return results;
    };

    return {
        search
    };
})();


const anoSearch = (function () {
    const popupBackground = document.getElementById('popup-background');
    const searchPopup = document.getElementById('search-popup');
    const searchInput = document.getElementById('search-input');

    const displayPopup = () => {
        popupBackground.className += ' visible';
    };

    const hidePopup = () => {
        popupBackground.className = popupBackground.className.replace(' visible', '');
        window.removeEventListener('keydown', onKeyPress);
        popupBackground.removeEventListener('click', hidePopup);
        searchInput.removeEventListener('keyup', onInputChange);
    };

    const noBubbling = () => {

    };

    const onKeyPress = (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc' || evt.keyCode === 27) {
            hidePopup();
            evt.preventDefault();
        }
    };

    const onInputChange = () => {
        anoData.search(searchInput.value);
    };

    const attachEventListeners = () => {
        window.addEventListener('keydown', onKeyPress);
        popupBackground.addEventListener('click', hidePopup);
        searchPopup.addEventListener('click', e => e.stopPropagation());
        searchInput.addEventListener('keyup', onInputChange);
    };

    const openSearchPopup = () => {
        displayPopup();
        searchInput.focus();
        attachEventListeners();
    };

    return {
        openSearchPopup
    };
})();

// document.getElementById('search-icon').addEventListener('click', () => {
//     anoSearch.openSearchPopup();
// });
