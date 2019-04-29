from django.conf.urls import url
from django.contrib import admin
from .views import HomeView, get_data
from .api.views import ChartLanguageData, ChartAgeData, ChartSexData

urlpatterns = [
    url(r'^$', HomeView.as_view(), name='home'),
    url(r'^api/data/$', get_data, name='api-data'),
    url(r'^api/chartAge/data/$', ChartAgeData.as_view()),
    url(r'^api/chartLanguage/data/$', ChartLanguageData.as_view()),
    url(r'^api/chartSex/data/$', ChartSexData.as_view()),
    url(r'^admin/', admin.site.urls),
]