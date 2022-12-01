// On vérifie si la case contient déja une valeur
function estValide(button){
    return button.innerHTML.length == 0;
}
// On écrit le symbole dans le button
function setSymbole(btn,symbole){
    btn.innerHTML = symbole;
}
// On vérifie si il y a un gagnant
function rechercherVainqueur(pions,joueurs,tour) {
    // Case 0,1,2
    if(pions[0].innerHTML == joueurs[tour] && pions[1].innerHTML == joueurs[tour] && pions[2].innerHTML == joueurs[tour]){
        pions[0].style.backgroundColor = "#9ACD32";
        pions[1].style.backgroundColor = "#9ACD32";
        pions[2].style.backgroundColor = "#9ACD32";
        return true;
    }
    // Case 3,4,5
    if(pions[3].innerHTML == joueurs[tour] && pions[4].innerHTML == joueurs[tour] && pions[5].innerHTML == joueurs[tour]){
        pions[3].style.backgroundColor = "#9ACD32";
        pions[4].style.backgroundColor = "#9ACD32";
        pions[5].style.backgroundColor = "#9ACD32";
        return true;
    }
    // Case 6,7,8
    if(pions[6].innerHTML == joueurs[tour] && pions[7].innerHTML == joueurs[tour] && pions[8].innerHTML == joueurs[tour]){
        pions[6].style.backgroundColor = "#9ACD32";
        pions[7].style.backgroundColor = "#9ACD32";
        pions[8].style.backgroundColor = "#9ACD32";
        return true;
    }
    // Case 0,3,6
    if(pions[0].innerHTML == joueurs[tour] && pions[3].innerHTML == joueurs[tour] && pions[6].innerHTML == joueurs[tour]){
        pions[0].style.backgroundColor = "#9ACD32";
        pions[3].style.backgroundColor = "#9ACD32";
        pions[6].style.backgroundColor = "#9ACD32";
        return true;
    }
    // Case 1,4,7
    if(pions[1].innerHTML == joueurs[tour] && pions[4].innerHTML == joueurs[tour] && pions[7].innerHTML == joueurs[tour]){
        pions[1].style.backgroundColor = "#9ACD32";
        pions[4].style.backgroundColor = "#9ACD32";
        pions[7].style.backgroundColor = "#9ACD32";
        return true;
    }
    // Case 2,5,8
    if(pions[2].innerHTML == joueurs[tour] && pions[5].innerHTML == joueurs[tour] && pions[8].innerHTML == joueurs[tour]){
        pions[2].style.backgroundColor = "#9ACD32";
        pions[5].style.backgroundColor = "#9ACD32";
        pions[8].style.backgroundColor = "#9ACD32";
        return true;
    }
    // Case 0,4,8
    if(pions[0].innerHTML == joueurs[tour] && pions[4].innerHTML == joueurs[tour] && pions[8].innerHTML == joueurs[tour]){
        pions[0].style.backgroundColor = "#9ACD32";
        pions[4].style.backgroundColor = "#9ACD32";
        pions[8].style.backgroundColor = "#9ACD32";
        return true;
    }
// Case 2,4,6
    if(pions[2].innerHTML == joueurs[tour] && pions[4].innerHTML == joueurs[tour] && pions[6].innerHTML == joueurs[tour]){
        pions[2].style.backgroundColor = "#9ACD32";
        pions[4].style.backgroundColor = "#9ACD32";
        pions[6].style.backgroundColor = "#9ACD32";
        return true;
    }
}
// On verifie si il n'y a pas de gagnant
function matchNul(pions){
    for(var i=0, len = pions.length; i < len;i++){
        if(pions[i].innerHTML.length ==0) return false;
    }
    return true;
}
// Pour afficher les informations
let Afficheur = function(element){
    let affichage = element;

    function setText(message){
        affichage.innerHTML = message;
    }
    return { sendMessage: setText};
};
// Fonction qui fait tout le jeu
function game(){
    // On récupère toute les cases 
    let pions = document.querySelectorAll('#morpion button');
    // On defnit les symboles des joueurs
    let joueurs = ['X','O'];
    // On definit le premier tour
    let tour = 0;
    let jeuEstFini = false;
    // On definit l'élément du DOM qui affiche les infos
    let afficheur = new Afficheur(document.querySelector('#resultat'));
    afficheur.sendMessage("Vous pouvez commencer joueur "+joueurs[tour]+" c'est à vous");
    // Le nerf de la guerre 
    for(var i=0, len = pions.length; i < len; i++) {
        pions[i].addEventListener("click",function(){

            let sonClick = document.createElement('audio');
            sonClick.src = 'assets/son/click.mp3'
            sonClick.play()
        // On vérifie si le jeu est fini
        if(jeuEstFini) return;

        // On vérifie si la case n'est pas déjà occupé
        if(!estValide(this)){
            // On indique que la case est déjà prise
            afficheur.sendMessage("case occupée !!!   <br /> Joueur "+joueurs[tour]+" c'est encore à vous");
        } else{
            // On remplit le button du symbole
            setSymbole(this,joueurs[tour]);
            // On vérifie si il y a un gagnant
            jeuEstFini = rechercherVainqueur(pions,joueurs,tour);

            // Si le jeu est terminé
            if(jeuEstFini){
                // On affiche un message
                afficheur.sendMessage("Le joueur "+joueurs[tour]+"a gagné !!");
                let sonFini = document.createElement('audio');
                sonFini.src = 'assets/son/yeahoo.mp3'
                sonFini.play()
                return;
            }
           // On vérifie si la partie est un match nul
           if(matchNul(pions)) {
            // On affiche un message
            afficheur.sendMessage("Partie terminé ! Match nul comme Buzz au code");
            let sonPerdu = document.createElement('audio');
            sonPerdu.src = 'assets/son/c_nul_homer.mp3'
            sonPerdu.play()
            return;
           } 
           // On va incrémenter les tours 
           tour++;
           tour = tour % 2;
           afficheur.sendMessage("Joueur "+joueurs[tour]+" c'est à vous !");
        }
        });
    }
}
game();