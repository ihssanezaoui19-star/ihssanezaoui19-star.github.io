# Honeypot sur mesure et interface CTI

**PFE réalisé en équipe en 2026.** Nous avons conçu une maquette pour observer les tentatives visant des services simulés, suivre leur parcours dans un réseau de laboratoire et analyser les traces dans une interface CTI.

## But du projet

Comprendre **ce qui se passe après une tentative sur un service exposé** : quels services sont visés, quelles étapes sont visibles après le premier contact et, pour une vulnérabilité connue, quand apparaît la première tentative observée par notre capteur. Le contexte d'étude portait sur des services simulant ceux d'une entreprise au Maroc ; un capteur seul ne représente pas toutes les attaques du pays.

## Problématique

Les honeypots T-Pot/Cowrie étudiés au départ ne reproduisaient pas assez précisément le service d'un client ni le parcours que nous voulions observer derrière le pare-feu. Comment construire un environnement adaptable au scénario, puis relier trafic, journaux et contexte CVE sans prendre chaque événement pour une intrusion réussie ?

## Ce que nous avons fait et pourquoi

| Travail décrit | Raison |
| --- | --- |
| Étudier les solutions existantes et tester T-Pot/Cowrie | Identifier leurs limites avant de définir notre propre capteur |
| Concevoir un honeypot capable de simuler un service client | Recueillir des interactions pertinentes pour le cas étudié |
| Dessiner un pare-feu et un réseau interne simulé derrière le service | Représenter la chaîne d'événements possible après une première interaction, dans un laboratoire contrôlé |
| Rapprocher journaux et PCAP dans une interface CTI | Rendre les tentatives lisibles et les examiner avec le contexte des vulnérabilités connues |
| Automatiser des traitements avec n8n | Réduire les tâches répétitives de collecte, rapprochement et présentation |

![Parcours d'observation conceptuel reconstruit](images/parcours-observation.svg)

## Résultat et limites

Une maquette d'observation adaptée aux services simulés et une interface CTI ont été développées dans le cadre du PFE, d'après la description du travail fournie par l'auteure. **Aucun jeu de données, mesure chiffrée du délai CVE, code source ou rapport interne n'est publié dans les dépôts accessibles** : je ne revendique donc ni taux de détection ni résultat représentatif de tout le Maroc. L'absence d'événement sur le capteur ne prouve pas l'absence d'attaque ailleurs.

[Lire la méthodologie : choix, réalisation, raison et vérifications](METHODOLOGIE.md).
