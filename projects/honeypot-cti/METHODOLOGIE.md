# Méthodologie — honeypot sur mesure et analyse CTI

> Cette reconstruction publique s'appuie sur la description du PFE par son auteure. Aucun code, rapport interne ni jeu de PCAP du PFE n'est accessible dans les dépôts GitHub connectés. Elle explique la démarche sans attribuer au projet des mesures ou déploiements non vérifiables.

## 1. Formuler la question de recherche

**Ce que nous cherchions :** observer les attaques sur des services simulés proches de ceux d'une entreprise au Maroc, suivre la chaîne après une première interaction, et examiner le délai entre une référence publique à une CVE et la première tentative visible sur un capteur du projet.

**Pourquoi :** compter des connexions seules ne dit pas ce que l'attaquant a tenté, quel service était concerné ni si une vulnérabilité précise était visée. Une observation depuis un capteur ne décrit pas, à elle seule, toutes les attaques au Maroc.

## 2. Étudier les outils avant l'installation définitive

Nous avons examiné et testé T-Pot et ses capteurs, notamment Cowrie. Nous avons confronté leurs services simulables et les traces produites à nos scénarios : service spécifique d'un client, vulnérabilités connues et visibilité sur le parcours après le point d'entrée. Les limites rencontrées pour ce besoin ont motivé le développement d'un honeypot propre au projet.

**Pourquoi :** une solution connue peut fournir beaucoup de données sans représenter correctement la question posée. Le choix du capteur doit suivre les services à observer et les événements nécessaires à l'analyse ; T-Pot était une étape d'évaluation, pas le nom du produit final.

## 3. Dessiner le périmètre contrôlé

Nous avons représenté un service exposé derrière un pare-feu et un réseau interne simulé. L'intention était de suivre, dans la maquette, les étapes entre la première interaction avec le service, les événements au pare-feu et les traces produites à l'intérieur. Des CVE connues servaient à construire des scénarios de test pour les services simulés.

**Pourquoi :** le seul journal d'un service exposé n'explique pas nécessairement ce qui arrive ensuite. Le réseau interne de laboratoire donne du contexte ; le filtrage et l'isolation évitent de transformer la maquette en point de rebond vers un vrai système. Le schéma suivant illustre le raisonnement, sans reproduire une topologie ou des adresses de l'entreprise.

![Parcours d'observation conceptuel](images/parcours-observation.svg)

## 4. Construire le capteur adapté au cas d'usage

Le honeypot développé pour le projet visait à simuler le service retenu et à recueillir les interactions utiles à ce scénario. Nous l'avons intégré dans le parcours d'observation de la maquette, au lieu d'utiliser uniquement les comportements standards des capteurs évalués.

**Pourquoi :** maîtriser la représentation du service permet de comparer une tentative observée aux conditions du scénario. Le dépôt public ne contient pas le code ni une spécification complète : les protocoles émulés, les vulnérabilités implémentées et la fidélité de la simulation ne sont donc pas détaillés ni revendiqués ici.

## 5. Rassembler trafic, journaux et contexte CTI

Nous avons travaillé sur les traces réseau/PCAP, les événements du service et leur présentation dans une interface CTI. Le rapprochement recherché est : **service visé → événement horodaté → trafic associé → éventuelle CVE pertinente → suite observable dans le laboratoire**.

**Pourquoi :** une alerte isolée peut être mal interprétée. Recouper les sources aide à reconstruire l'ordre des faits ; il faut vérifier les horloges et distinguer une connexion, une tentative et un succès. Une adresse source ne suffit pas pour attribuer avec certitude l'attaquant ou son pays.

## 6. Automatiser les traitements récurrents avec n8n

Des flux n8n ont été utilisés pour automatiser des parties répétitives de la collecte, du rapprochement et de la présentation dans l'interface. L'objectif était de garder une chaîne plus régulière lorsque plusieurs événements sont observés.

**Pourquoi :** déplacer manuellement des traces entre composants ralentit l'analyse et crée des oublis. Les workflows, connecteurs, secrets et mesures de fiabilité n'étant pas publics, je ne décris pas un déclencheur précis ou un taux d'automatisation non vérifié.

## 7. Examiner le délai relatif à une CVE

La question de recherche imposait de choisir une date de référence pour chaque CVE (par exemple publication ou première observation externe), d'identifier la première tentative **effectivement vue sur notre service simulé**, de normaliser les horodatages et de comparer ces instants.

**Pourquoi :** « première attaque » ne peut signifier ici que « première tentative observée par notre dispositif », avec la date de référence explicitée. Une CVE non observée n'établit pas qu'aucun attaquant ne l'a utilisée. Aucun délai chiffré n'est publié dans les sources accessibles.

## 8. Vérifier et exposer les limites

Un essai autorisé devrait montrer que le service génère bien un événement, que la trace réseau peut être reliée au même instant, que l'interface restitue le parcours et que l'isolation demeure effective. Les données brutes, adresses, secrets et détails des vulnérabilités exposées dans l'environnement interne restent hors de cette publication.

**Résultat présenté honnêtement :** conception d'un capteur et d'une maquette propres au scénario, interface CTI et automatisation décrites par l'auteure ; pas de statistiques d'attaque, de délai CVE mesuré, de couverture nationale ou de performance démontrée ici.
