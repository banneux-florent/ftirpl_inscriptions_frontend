import { reactive } from 'vue';

const texts = reactive({
  "FORM_ERROR_TRY_AGAIN": "Le formulaire a rencontré un problème. Veuillez réessayer.",
  "FORM_ERROR_TRY_AGAIN_LATER": "Le formulaire a rencontré un problème de connexion. Veuillez réessayer plus tard.",
  "FORM_NO_RESPONSE_TRY_AGAIN_LATER": "Le formulaire envoyé n'a pas obtenu de réponse. Veuillez réessayer plus tard.",
});

export function getText(key) {
  return texts[key] || key;
}