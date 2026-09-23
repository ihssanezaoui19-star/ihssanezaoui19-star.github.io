# Audit et durcissement d'Active Directory

**Projet de stage (2025) - maquette de laboratoire simulant un cas client.** Ce dépôt présente mon travail sur la sécurité d'un domaine Active Directory, de l'état initial à la vérification des corrections. Il ne décrit pas une intervention sur l'annuaire de production d'un client.

## Problématique

Une configuration AD insuffisamment contrôlée peut cumuler des droits excessifs, des protocoles hérités, une politique de comptes trop permissive et une journalisation incomplète. Comment identifier les écarts prioritaires, vérifier leurs conséquences dans une maquette, puis mesurer l'effet des corrections ?

## Ce que j'ai réalisé

Dans ce projet de stage, j'ai travaillé sur la conception de la maquette virtualisée, la mise en place d'AD DS et des postes de test, l'étude d'outils d'audit, l'analyse du premier rapport PingCastle, des scénarios de test contrôlés, la collecte des événements avec Wazuh et Sysmon, les mesures de durcissement et le nouvel audit. Le travail a été réalisé dans le cadre du stage avec l'équipe ; les résultats ci-dessous concernent la maquette.

| Étape | Réalisation | Vérification |
| --- | --- | --- |
| Préparer | Déployer sous Proxmox un contrôleur de domaine Windows Server, des postes Windows, un poste de test et une plateforme Wazuh | Machines et services AD DS, DNS et DHCP opérationnels dans le laboratoire |
| Auditer | Comparer des outils, retenir PingCastle et analyser les familles d'écarts | Score initial PingCastle : **95/100** |
| Observer | Reproduire des scénarios d'abus dans le laboratoire et relier leurs traces aux alertes | Événements observés dans Wazuh, notamment pour des accès distants et des activités sur les comptes |
| Corriger | Réduire les privilèges, renforcer les GPO et la politique de comptes, désactiver des protocoles hérités, ajouter LAPS, l'audit avancé et des sauvegardes | Contrôles après modification puis nouvel audit PingCastle |
| Réévaluer | Comparer l'état initial et l'état final | Score final **20/100** dans cette maquette ; des écarts subsistent |

![Architecture anonymisée du laboratoire AD](images/architecture-laboratoire.svg)

## Résultat et limites

Le score de risque PingCastle du laboratoire est passé de **95/100 à 20/100**. Ce score est un indicateur de l'outil sur l'environnement audité, pas un pourcentage de sécurité ni une preuve que tous les risques ont disparu. Les tests de supervision ont produit des alertes sur plusieurs scénarios simulés. Le rapport ne mesure pas le délai de détection, le taux de faux positifs ou la performance en production ; certaines corrections restent des recommandations pour un environnement réel.

![Comparaison anonymisée des scores PingCastle](images/score-avant-apres.svg)

## Documentation

- [Méthodologie détaillée : étapes, contrôles et résultats](METHODOLOGIE.md)
- [Chaîne de supervision illustrée](images/supervision-wazuh.svg)

**Périmètre public :** les schémas sont reconstruits à partir du rapport de stage et anonymisés. Ce ne sont pas des captures originales. Aucun nom d'entreprise ou de client, domaine, nom d'hôte, compte, adresse IP, secret, hachage, clé d'agent ou rapport d'audit brut n'est publié ici.
