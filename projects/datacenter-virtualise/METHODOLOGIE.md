# Méthodologie — datacenter virtualisé (travail en cours)

> Journal de conception fondé sur la description du laboratoire personnel. Aucun rapport de déploiement ou résultat de bascule n'est disponible sur le GitHub connecté. Chaque étape indique ce qui est engagé et ce qui reste à vérifier.

## 1. Décrire l'entreprise fictive et les services attendus

**Engagé :** poser le scénario de l'entreprise, les services à héberger et les dépendances entre réseau, machines et administration. Dessiner les premiers schémas avant de multiplier les VMs.

**Pourquoi :** sans service à protéger ni utilisateur défini, une « haute disponibilité » resterait un mot sur un dessin. Une panne d'identité, de réseau ou d'hôte n'a pas le même effet selon l'application.

**À vérifier ensuite :** dresser une liste finale des services critiques et des conditions de fonctionnement normal observables.

## 2. Séparer les réseaux et les rôles sous VMware Workstation Pro

**Engagé :** préparer progressivement machines virtuelles, interfaces et réseaux virtuels correspondant aux zones du schéma. Noter quel flux doit traverser quelle zone et quels composants partagent le même hôte physique.

**Pourquoi :** la segmentation permet d'étudier les autorisations et les dépendances. Plusieurs VMs sur un seul ordinateur restent exposées à la panne de cet ordinateur ; elles ne suffisent pas à prouver une tolérance aux pannes matérielles.

![Schéma de travail : conception et validations futures](images/architecture-en-cours.svg)

**À vérifier ensuite :** comparer le diagramme à la topologie réellement installée et tester un flux autorisé et un flux refusé pour chaque séparation importante.

## 3. Définir supervision, accès et sauvegardes avant les pannes

**Prévu dans le plan :** identifier les accès d'administration, journaux, sauvegardes et services nécessaires à une reprise, sans présumer de leur déploiement complet.

**Pourquoi :** une panne est difficile à expliquer sans état initial et sans journaux. Une restriction réseau mal choisie peut elle-même provoquer une interruption ; chaque règle doit être examinée au regard des services qui en dépendent.

**À vérifier ensuite :** conserver une configuration de référence et tester une restauration sur la maquette avant de la présenter comme fonctionnelle.

## 4. Préparer une matrice d'essais de panne

Pour chaque scénario retenu, la méthode prévue est : relever l'état du service et les journaux, couper **un seul composant**, observer ce qui reste accessible, rétablir ou basculer selon les mécanismes effectivement installés, puis mesurer le temps d'interruption et vérifier les données.

| Scénario à tester | Question posée | Preuve à conserver |
| --- | --- | --- |
| Arrêt d'une VM de service | Existe-t-il une instance ou un chemin de secours opérationnel ? | Heure de coupure, accessibilité du service, heure de retour |
| Perte d'un réseau virtuel | Quel service dépend de cette liaison ? | Traces des deux zones et du routage après coupure |
| Restauration d'une sauvegarde | Les données et permissions reviennent-elles correctement ? | Procédure suivie et contrôle fonctionnel après restauration |

**État :** ces lignes sont un protocole d'essai, pas des pannes simulées avec succès ni une mesure de PRA déjà obtenue.

## 5. Rendre les résultats vérifiables après exécution

Publier le diagramme de la version installée, les captures de configuration dépourvues de secrets, les conditions du test, les heures relevées, les erreurs rencontrées et le contrôle du service après retour. Comparer le résultat aux objectifs initialement définis.

**Résultat disponible aujourd'hui :** scénario, schéma de travail et plan de validation. Le déploiement complet, la bascule et la reprise restent à démontrer ; aucun taux de disponibilité ni temps de restauration n'est annoncé.
