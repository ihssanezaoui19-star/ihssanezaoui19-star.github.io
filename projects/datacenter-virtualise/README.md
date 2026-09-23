# Datacenter virtualisé — laboratoire en cours

**Projet personnel sur VMware Workstation Pro.** L'objectif est de simuler une infrastructure d'entreprise fictive et de comprendre comment segmentation, dépendances de services, supervision et reprise influencent la disponibilité.

## Problématique

Une panne d'un hôte, d'un réseau virtuel ou d'un service central peut couper plusieurs applications. Avant de parler de « haute disponibilité », il faut montrer quelles dépendances existent, quel composant constitue un point unique de panne et quel scénario de retour à la normale peut réellement être testé.

## État du projet

| Réalisé ou décrit à ce stade | Prévu, sans résultat final vérifié |
| --- | --- |
| Scénario d'entreprise fictive, premiers schémas et besoins d'isolation | Déploiement complet des services et mesures de disponibilité |
| Préparation progressive des machines et réseaux dans VMware Workstation Pro | Tests de panne, bascule et plan de reprise d'activité |
| Définition des dépendances à observer | Rapport chiffré sur interruption et temps de restauration |

![Vue de travail de l'architecture envisagée, éléments prévus explicitement signalés](images/architecture-en-cours.svg)

## Résultat et preuves

Le scénario et la démarche de laboratoire sont formulés ; **aucun test de haute disponibilité ou de PRA finalisé n'est fourni dans les dépôts GitHub accessibles**. Je ne présente donc pas de temps de bascule ni de service redondant comme acquis. Les captures et configurations pourront être ajoutées après validation des essais.

[Lire les étapes de construction et le plan de validation](METHODOLOGIE.md).
