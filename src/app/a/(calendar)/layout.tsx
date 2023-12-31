'use client';
import {registerLicense} from '@syncfusion/ej2-base';
import "@syncfusion/ej2/bootstrap.css";
import {setCulture, setCurrencyCode, L10n, loadCldr} from '@syncfusion/ej2-base';

// Registering Syncfusion license key
registerLicense('ORg4AjUWIQA/Gnt2VFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5Xd0ViWXpccXxWQGRV');


loadCldr(
    require('cldr-data/supplemental/numberingSystems.json'),
    require('cldr-data/main/fr/ca-gregorian.json'),
    require('cldr-data/main/fr/numbers.json'),
    require('cldr-data/main/fr/timeZoneNames.json')
);

/*L10n.load({
    "fr": {
    "schedule": {
        "day": "journée",
            "week": "La semaine",
            "workWeek": "Semaine de travail",
            "month": "Mois",
            "agenda": "Ordre du jour",
            "weekAgenda": "Agenda de la semaine",
            "workWeekAgenda": "Agenda de la semaine de travail",
            "monthAgenda": "Agenda du mois",
            "today": "Aujourd'hui",
            "noEvents": "Pas d'événements",
            "emptyContainer": "Aucun événement n'est prévu ce jour-là.",
            "allDay": "Toute la journée",
            "start": "Début",
            "end": "Fin",
            "more": "plus",
            "close": "Fermer",
            "cancel": "Annuler",
            "noTitle": "(Pas de titre)",
            "delete": "Effacer",
            "deleteEvent": "Supprimer l'événement",
            "deleteMultipleEvent": "Supprimer plusieurs événements",
            "selectedItems": "Items selected",
            "deleteSeries": "Supprimer la série",
            "edit": "modifier",
            "editSeries": "Modifier la série",
            "editEvent": "Modifier l'événement",
            "createEvent": "Créer",
            "subject": "Assujettir",
            "addTitle": "Ajouter un titre",
            "moreDetails": "Plus de détails",
            "save": "sauvegarder",
            "editContent": "Voulez-vous modifier uniquement cet événement ou toute la série?",
            "deleteRecurrenceContent": "Voulez-vous supprimer uniquement cet événement ou toute la série?",
            "deleteContent": "Êtes-vous sûr de vouloir supprimer cet événement?",
            "deleteMultipleContent": "Êtes-vous sûr de vouloir supprimer les événements sélectionnés?",
            "newEvent": "Nouvel évènement",
            "title": "Titre",
            "location": "Emplacement",
            "description": "La description",
            "timezone": "Fuseau horaire",
            "startTimezone": "Démarrer fuseau horaire",
            "endTimezone": "Fin du fuseau horaire",
            "repeat": "Répéter",
            "saveButton": "sauvegarder",
            "cancelButton": "Annuler",
            "deleteButton": "Effacer",
            "recurrence": "Récurrence",
            "wrongPattern": "Le modèle de récurrence n'est pas valide.",
            "seriesChangeAlert": "Les modifications apportées à des instances spécifiques de cette série seront annulées et ces événements correspondront à nouveau à la série.",
            "createError": "La durée de l'événement doit être plus courte que sa fréquence. Raccourcissez la durée ou modifiez le modèle de récurrence dans l'éditeur d'événement de récurrence.",
            "recurrenceDateValidation": "Certains mois ont moins que la date sélectionnée. Pour ces mois, l'événement se produira à la dernière date du mois.",
            "sameDayAlert": "Deux occurrences du même événement ne peuvent pas se produire le même jour.",
            "editRecurrence": "Modifier la récurrence",
            "repeats": "Répétitions",
            "alert": "Alerte",
            "startEndError": "La date de fin sélectionnée se produit avant la date de début.",
            "invalidDateError": "La valeur de date saisie est invalide.",
            "ok": "D'accord",
            "occurrence": "Occurrence",
            "series": "Séries",
            "previous": "précédent",
            "next": "Prochain",
            "timelineDay": "Journée chronologique",
            "timelineWeek": "Semaine chronologique",
            "timelineWorkWeek": "Semaine de travail chronologique",
            "timelineMonth": "Mois de la chronologie"
    },
    "recurrenceeditor": {
        "none": "Aucun",
            "daily": "du quotidien",
            "weekly": "Hebdomadaire",
            "monthly": "Mensuel",
            "month": "Mois",
            "yearly": "Annuel",
            "never": "Jamais",
            "until": "Jusqu'à",
            "count": "Compter",
            "first": "First",
            "second": "Seconde",
            "third": "Troisième",
            "fourth": "Quatrième",
            "last": "Dernier",
            "repeat": "Répéter",
            "repeatEvery": "Répétez chaque",
            "on": "Répéter sur",
            "end": "Fin",
            "onDay": "journée",
            "days": "journées",
            "weeks": "semaines",
            "months": "Mois",
            "years": "Années",
            "every": "chaque",
            "summaryTimes": "fois",
            "summaryOn": "sur",
            "summaryUntil": "jusqu'à",
            "summaryRepeat": "Répétitions",
            "summaryDay": "journées",
            "summaryWeek": "semaines",
            "summaryMonth": "mois",
            "summaryYear": "années"
    },
    "(calendar)": {
        "today": "Aujourd'hui"
    }
}})
*/

setCulture('fr');
setCurrencyCode('EUR');

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (<>{children}</>)
}
