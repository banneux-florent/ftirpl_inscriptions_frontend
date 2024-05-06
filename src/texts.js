import { reactive } from 'vue';

const texts = reactive({
  "FORM_ERROR_TRY_AGAIN": "Le formulaire a rencontré un problème. Veuillez réessayer.",
  "FORM_ERROR_TRY_AGAIN_LATER": "Le formulaire a rencontré un problème de connexion. Veuillez réessayer plus tard.",
  "FORM_NO_RESPONSE_TRY_AGAIN_LATER": "Le formulaire envoyé n'a pas obtenu de réponse. Veuillez réessayer plus tard.",
  "ACCOUNT_COULD_NOT_BE_CREATED": "Oops! Votre compte n'a pas pu être créé. Si l'erreur persiste, veuillez contacter notre Commission Provinciale.",
  "PASSWORD_MUST_INCLUDE_XYZ": "Le mot de passe doit contenir une lettre majuscule et une lettre minuscule ainsi qu'un chiffre et doit être long d'au moins 8 caractères.",
  "PASSWORD_DOES_NOT_MATCH": "Le mot de passe indiqué ne correspond pas.",
  "MUST_ACCEPT_GTC_GDPR": "Pour créer votre compte, vous devez accepter nos CGU ainsi que notre RGPD.",
  "FIELD_CANNOT_BE_EMPTY": "Veuillez compléter ce champ.",
});

export function getText(key) {
  return texts[key] || key;
}