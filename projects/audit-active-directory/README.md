# Audit et durcissement d'Active Directory

**Projet de stage (2025) - maquette de laboratoire simulant un cas client.** Ce dépôt présente mon travail sur la sécurité d'un domaine Active Directory, de l'état initial à la vérification des corrections. Il ne décrit pas une intervention sur l'annuaire de production d'un client.

## Problématique

Une configuration AD insuffisamment contrôlée peut cumuler des droits excessifs, des protocoles hérités, une politique de comptes trop permissive et une journalisation incomplète. Comment montrer l'effet concret de ces faiblesses, détecter les actions suspectes et corriger **sans interrompre les services qui dépendent de l'annuaire** ?

## Ce que j'ai réalisé

Dans ce projet de stage, j'ai travaillé sur la conception de la maquette virtualisée, la mise en place d'AD DS et des postes de test, l'étude d'outils d'audit, l'analyse du premier rapport PingCastle, des scénarios de test contrôlés, la supervision Wazuh/Sysmon, les mesures de durcissement et le nouvel audit. Le travail a été réalisé dans le cadre du stage avec l'équipe ; les résultats ci-dessous concernent la maquette.

| Étape | Réalisation | Vérification |
| --- | --- | --- |
| Préparer | Déployer sous Proxmox un contrôleur de domaine Windows Server, des postes Windows, un poste de test et une plateforme Wazuh | Machines et services AD DS, DNS et DHCP opérationnels dans le laboratoire |
| Auditer | Comparer des outils, retenir PingCastle et analyser les familles d'écarts | Score initial PingCastle : **95/100** |
| Tester et détecter | Reproduire dans le laboratoire des abus possibles d'AD ; installer Wazuh, Sysmon et des règles de détection pour vérifier la remontée des événements | Alertes observées pour plusieurs scénarios simulés : exécution distante, accès aux identifiants, activité SMB/LDAP et échecs de connexion |
| Étudier l'impact | Vérifier les dépendances et la compatibilité avant de modifier les protocoles, les comptes, les GPO ou les services | Audit NTLM avant blocage, état initial et sauvegardes pour les changements sensibles |
| Corriger et vérifier | Appliquer selon le cas des commandes PowerShell ou des réglages dans les consoles AD/GPO ; renforcer droits, comptes, protocoles, LAPS, audit et sauvegardes | Contrôles après modification puis nouvel audit PingCastle |
| Réévaluer | Comparer l'état initial et l'état final | Score final **20/100** dans cette maquette ; des écarts subsistent |

![Architecture anonymisée du laboratoire AD](images/architecture-laboratoire.svg)

### Pourquoi Wazuh et les tests d'intrusion ?

PingCastle signalait des écarts de configuration, mais ce diagnostic ne montrait pas à lui seul comment les reconnaître dans les journaux. Les tests autorisés sur les machines de la maquette visaient à vérifier les conséquences possibles et la capacité de détection. Les agents Wazuh recueillaient les événements Windows ; Sysmon enrichissait ceux du serveur ; Manager, Indexer et Dashboard permettaient de traiter, rechercher et visualiser les alertes. Le rapport documente des règles configurées et plusieurs alertes effectivement observées. Il ne démontre pas une couverture exhaustive des attaques.

![Extrait anonymisé d'une alerte Wazuh observée dans la maquette](images/capture-wazuh-alerte.png)

### Comment les corrections ont été choisies

Une recommandation de sécurité peut aussi perturber un système : désactiver NTLMv1 ou SMBv1 peut casser une application ancienne ; changer des droits GPO ou des comptes de service peut bloquer une tâche ; supprimer le spooler empêche l'impression locale. La méthode documentée est donc **constat → vérification des usages et de l'impact → sauvegarde/retour arrière si nécessaire → correction contrôlée → validation fonctionnelle et nouvel audit**. Les changements effectués dans cette maquette ne sont pas des consignes à appliquer tels quels à un domaine de production.

Les corrections et leurs contrôles sont détaillés dans la [méthodologie pas à pas](METHODOLOGIE.md), avec des extraits des commandes employées et des captures de la maquette.

## Résultat et limites

Le score de risque PingCastle du laboratoire est passé de **95/100 à 20/100**. Ce score est un indicateur de l'outil sur l'environnement audité, pas un pourcentage de sécurité ni une preuve que tous les risques ont disparu. Les tests de supervision ont produit des alertes sur plusieurs scénarios simulés. Le rapport ne mesure pas le délai de détection, le taux de faux positifs ou la performance en production ; certaines corrections restent des recommandations pour un environnement réel.

![Comparaison anonymisée des scores PingCastle](images/score-avant-apres.svg)

## Documentation

- [Méthodologie détaillée : Wazuh, tests, analyse d'impact, commandes, captures et résultats](METHODOLOGIE.md)
- [Chaîne de supervision illustrée](images/supervision-wazuh.svg)

**Périmètre public :** les schémas sont reconstruits à partir du rapport. Les captures sont de vrais extraits du rapport, recadrés pour ne conserver que les paramètres et résultats utiles. Le PDF original, les vues complètes et les informations d'entreprise restent privés. Aucun nom d'entreprise ou de client, domaine, nom d'hôte, compte, adresse IP, secret, hachage ou clé d'agent n'est publié ici.
