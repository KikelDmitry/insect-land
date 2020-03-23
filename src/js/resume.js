let skillsBlocks = document.querySelectorAll('.skills');
skillsBlocks.forEach(function (skillsBlock) {
    let elems = skillsBlock.querySelectorAll('.skills__elem'),
        descCont = document.createElement('div');
    descCont.classList.add('skills__desc');  
    descCont.title = 'Закрыть';  
    skillsBlock.append(descCont)
    elems.forEach(function (elem) {
        let text = elem.querySelector('.skills__text');
        //if elem has text - add class to elem or title
        elem.addEventListener('click', function () {
            if(text) {
                descOpen(this);
                function descOpen(skill) {
                    descCont.classList.add('is-active');
                    let clonedSkill = skill.cloneNode(true).innerHTML;
                    descCont.innerHTML = clonedSkill;                
                }
                function descClose() {
                    descCont.classList.remove('is-active');
                    descCont.innerHTML = '';
                }
                descCont.addEventListener('click', descClose)
            }
        })
    })
})