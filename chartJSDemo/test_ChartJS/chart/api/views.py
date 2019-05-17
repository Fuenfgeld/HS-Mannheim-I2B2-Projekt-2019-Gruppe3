from rest_framework.views import APIView
from rest_framework.response import Response
import pandas as pd


df = pd.read_csv(r'chart\data\i2b2demodata_patient_dimen.csv', index_col=0)


class ChartAgeData(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None):
        df_age = df['age']
        labels = ["0-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70+"]
        default_items = [df_age.loc[(df_age.values >= 0) & (df_age.values < 10)].count(),
                         df_age.loc[(df_age.values >= 10) & (df_age.values < 20)].count(),
                         df_age.loc[(df_age.values >= 20) & (df_age.values < 30)].count(),
                         df_age.loc[(df_age.values >= 30) & (df_age.values < 40)].count(),
                         df_age.loc[(df_age.values >= 40) & (df_age.values < 50)].count(),
                         df_age.loc[(df_age.values >= 50) & (df_age.values < 60)].count(),
                         df_age.loc[(df_age.values >= 60) & (df_age.values < 70)].count(),
                         df_age.loc[(df_age.values >= 70)].count()]
        data = {
            "labels": labels,
            "default": default_items,
        }
        return Response(data)


class ChartLanguageData(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None):
        df_language = df['language']
        labels = df_language.value_counts().index
        default_items = df_language.value_counts().values
        data = {
            "labels": labels,
            "default": default_items,
        }
        return Response(data)


class ChartSexData(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None):
        df_sex = df['sex']
        labels = ['Männlich', 'Weiblich']
        default_items = df_sex.value_counts().values
        data = {
            "labels": labels,
            "default": default_items,
        }
        return Response(data)

