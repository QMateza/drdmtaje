from django.shortcuts import render


# Create your views here.
def home(request):
    context = {}
    return render(request, 'base/home.html')


def about(request):
    if (request.resolver_match.url_name == 'about'):
        heading = 'About us'
        subheading = 'Compassionate Care, Healthy Smiles – Dedicated to You!'
        classNamke = 'about'
        context = {'heading': heading, 'subheading': subheading, 'classNamke': classNamke}
        return render(request, 'base/about.html', context)
    else:
        return render(request, 'base/about.html')


def services(request):
    if (request.resolver_match.url_name == 'services'):
        classNamke = 'services'
        context = {'heading': 'Services', 'subheading': 'Your Smile, Our Expertise. Comprehensive Care Tailored Just for You!', 'classNamke': classNamke}
        return render(request, 'base/services.html', context)


def contacts(request):
    if (request.resolver_match.url_name == 'contacts'):
        classNamke = 'contacts'
        context = {'heading': 'Contacts', 'subheading': '', 'classNamke': classNamke}
        return render(request, 'base/contacts.html', context)
