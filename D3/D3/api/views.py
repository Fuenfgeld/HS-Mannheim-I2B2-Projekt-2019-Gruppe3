from rest_framework.views import APIView
from rest_framework.response import Response
import pandas as pd

df = pd.read_csv(r'D3\data\i2b2demodata_patient_dimen.csv', index_col=0)


class ChartDashboardAgeData(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None):
        df_m = df[df['sex'] == 'M']
        df_m = df_m['age']
        df_f = df[df['sex'] == 'F']
        df_f = df_f['age']
        labels = ["0-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70+"]
        default_items = [
            df_m.loc[(df_m.values >= 0) & (df_m.values < 10)].count(),
            df_f.loc[(df_f.values >= 0) & (df_f.values < 10)].count(),
            df_m.loc[(df_m.values >= 10) & (df_m.values < 20)].count(),
            df_f.loc[(df_f.values >= 10) & (df_f.values < 20)].count(),
            df_m.loc[(df_m.values >= 20) & (df_m.values < 30)].count(),
            df_f.loc[(df_f.values >= 20) & (df_f.values < 30)].count(),
            df_m.loc[(df_m.values >= 30) & (df_m.values < 40)].count(),
            df_f.loc[(df_f.values >= 30) & (df_f.values < 40)].count(),
            df_m.loc[(df_m.values >= 40) & (df_m.values < 50)].count(),
            df_f.loc[(df_f.values >= 40) & (df_f.values < 50)].count(),
            df_m.loc[(df_m.values >= 50) & (df_m.values < 60)].count(),
            df_f.loc[(df_f.values >= 50) & (df_f.values < 60)].count(),
            df_m.loc[(df_m.values >= 60) & (df_m.values < 70)].count(),
            df_f.loc[(df_f.values >= 60) & (df_f.values < 70)].count(),
            df_m.loc[(df_m.values >= 70)].count(), df_f.loc[(df_f.values >= 70)].count()
        ]
        data = {
            "labels": labels,
            "default": default_items,
        }
        return Response(data)
