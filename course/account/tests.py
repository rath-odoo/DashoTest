from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from account.forms import RegistrationForm

User = get_user_model()

class RegisterViewTests(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='securepassword')

    def test_authenticated_user_redirect(self):
        self.client.login(username='testuser', password='securepassword')
        response = self.client.get(reverse('account:register'))
        print("Status Code:", response.status_code)
        print("Redirect URL:", response.get('Location'))
        self.assertEqual(response.status_code, 302)
        expected_url = reverse('account:alreadyAuthenticated')
        self.assertRedirects(response, expected_url, fetch_redirect_response=False)

    def test_register_page_GET(self):
        response = self.client.get(reverse('account:register'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'account/register.html')
        self.assertIsInstance(response.context['registration_form'], RegistrationForm)

    def test_successful_registration(self):
        response = self.client.post(reverse('account:register'), data={
            'firstname': 'Test',
            'lastname': 'User',
            'username': 'testuser2',
            'email': 'testuser2@example.com',
            'password1': 'securepassword123',
            'password2': 'securepassword123'
        })
        self.assertEqual(response.status_code, 302)
        # expected_url = reverse('account:login')
        # self.assertRedirects(response, expected_url, fetch_redirect_response=False)
        # self.assertRedirects(response, settings.BASE_URL + '/account/registrationsuccess/')
        # self.assertTrue(User.objects.filter(username='testuser2').exists())

    # def test_post_valid_data(self):
    #     valid_data = {
    #         'username': 'newuser',
    #         'email': 'newuser@example.com',
    #         'password1': 'newpassword123',
    #         'password2': 'newpassword123',
    #         'firstname': 'New',
    #         'lastname': 'User',
    #     }
    #     response = self.client.post(reverse('account:register'), data=valid_data)
    #     print("Status Code:", response.status_code)
    #     print("Redirect URL:", response.get('Location'))
    #     self.assertEqual(response.status_code, 302)
    #     self.assertRedirects(response, reverse('account:registrationsuccess'))

    # def test_post_invalid_data(self):
    #     invalid_data = {
    #         'username': 'newuser',
    #         'email': 'newuser@example.com',
    #         'password1': 'newpassword123',
    #         'password2': 'differentpassword',
    #         'firstname': 'New',
    #         'lastname': 'User',
    #     }
    #     response = self.client.post(reverse('account:register'), data=invalid_data)
    #     print("Status Code:", response.status_code)
    #     print("Form Errors:", response.context['registration_form'].errors)
    #     self.assertEqual(response.status_code, 200)
    #     self.assertFormError(response, 'registration_form', 'password2', 'The two password fields didn’t match.')
