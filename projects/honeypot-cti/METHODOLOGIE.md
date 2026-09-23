# Méthodologie — observation des attaques par honeypot et CTI

> Synthèse fondée sur la description du PFE par son auteure, sans rapport ni dépôt du code source accessibles dans les GitHub connectés. Le schéma est une reconstruction, pas une capture de l'environnement réel.

## 1. Poser une question d'observation

Étudier les attaques reçues par des services simulés en contexte marocain, avec deux usages distincts : reproduire un service proche d'un client et rapprocher une CVE publique de la première tentative observée sur **notre propre capteur**. L'objectif est exploratoire ; une seule infrastructure ne mesure pas l'ensemble des attaques d'un pays.

## 2. Évaluer les honeypots existants

Comparer les capteurs T-Pot/Cowrie aux besoins de personnalisation, aux traces recherchées et à la possibilité de simuler le parcours après un accès initial. Les écarts observés dans ce contexte ont conduit à définir un capteur sur mesure. T-Pot reste une étape d'étude, pas la description de tout le produit final.

## 3. Concevoir le service et son environnement

Placer le service simulé derrière un pare-feu, puis représenter un réseau interne de laboratoire afin d'observer plusieurs étapes d'une séquence. Les vulnérabilités connues servent à construire et tester des scénarios dans un périmètre isolé. Les règles de filtrage doivent éviter qu'un service exposé devienne un point de rebond vers une infrastructure réelle.

![Parcours d'observation conceptuel](images/parcours-observation.svg)

## 4. Collecter et rapprocher les observations

Rassembler journaux applicatifs et traces réseau/PCAP, synchroniser les horodatages, puis rapprocher un événement du service visé et du contexte de vulnérabilité connu. La plateforme CTI rend ce parcours lisible sans imposer qu'une alerte corresponde automatiquement à une attaque attribuée ou réussie.

## 5. Organiser les traitements avec n8n

Automatiser les tâches répétitives de transfert, enrichissement et présentation des observations dans l'interface. Les détails des workflows et leurs secrets d'intégration ne sont pas disponibles pour la version publique ; aucun connecteur ou indicateur de performance n'est inventé ici.

## 6. Examiner la question du délai CVE

Pour chaque CVE étudiée, il faudrait consigner la date de référence retenue (publication ou première observation externe), la première tentative effectivement vue sur le service simulé, vérifier le fuseau horaire et calculer la différence. Un événement non reçu peut signifier absence de visibilité plutôt qu'absence d'attaquants. **Le chiffre final n'est pas fourni dans les sources accessibles et n'est donc pas annoncé.**

## 7. Valider et préserver les limites

Vérifier les journaux pour un scénario autorisé, la séparation du réseau simulé et la cohérence entre trafic, événement et affichage CTI. Une maquette et un capteur sur mesure rendent certains parcours plus observables ; ils ne prouvent ni attribution géographique certaine ni couverture complète. Les PCAP, adresses d'entreprise, secrets et vulnérabilités exploitées dans l'environnement interne restent hors de cette publication.
