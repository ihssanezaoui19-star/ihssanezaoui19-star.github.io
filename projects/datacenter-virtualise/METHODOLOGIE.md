# Méthodologie — datacenter virtualisé en cours

> Cette page est un journal de démarche, pas un compte rendu de résultats. Elle se fonde sur la description du laboratoire personnel ; aucun dépôt ni rapport de déploiement n'a été trouvé sur le GitHub connecté.

## 1. Définir les services critiques du scénario

Identifier les services de l'entreprise fictive, leurs utilisateurs et leurs dépendances réseau/système. Dessiner quelles ressources deviennent indisponibles si l'hôte virtuel, le réseau ou l'identité centralisée tombe.

## 2. Concevoir les segments et machines

Séparer les rôles et interfaces dans VMware Workstation Pro ; noter les flux qui doivent traverser les zones. Les premiers schémas et le montage progressif des VMs constituent l'étape en cours. La présence d'une VM ne démontre pas une redondance.

![Architecture de travail avec statut des validations](images/architecture-en-cours.svg)

## 3. Définir les contrôles de sécurité

Lister les règles réseau, accès d'administration, sauvegardes et journaux nécessaires à une récupération. Avant toute restriction, vérifier quelles applications dépendent d'un flux, afin de ne pas créer une panne avec une règle de sécurité.

## 4. Préparer les essais de panne et de reprise

Pour chaque scénario : relever un état fonctionnel initial, interrompre un seul composant, observer l'effet sur les services, restaurer ou basculer selon l'architecture installée, puis mesurer l'interruption et vérifier l'intégrité des données. Documenter aussi les échecs. **Cette matrice décrit les tests à réaliser, pas des résultats déjà obtenus.**

## 5. Publier ensuite des preuves vérifiables

Après exécution, conserver un diagramme de la version réellement déployée, des captures de configuration sans secrets, un tableau des incidents simulés et les mesures de reprise. Les distinguer du schéma de conception initial et des objectifs de disponibilité.
