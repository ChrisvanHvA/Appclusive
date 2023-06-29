const onboardingButton = document.querySelector('#revisitOnboarding');

onboardingButton.addEventListener('click', () => {
    localStorage.removeItem('onboarding_tour');
});