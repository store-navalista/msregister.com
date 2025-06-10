import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
import React from 'react'

const styles = StyleSheet.create({
   page: {
      padding: 10,
      fontSize: 8,
      fontFamily: 'Helvetica'
   },
   sectionTitle: {
      fontSize: 10,
      marginVertical: 4,
      fontWeight: 'bold',
      color: 'red'
   },
   tableHeader: {
      flexDirection: 'row',
      borderBottom: '1px solid black',
      fontWeight: 'bold'
   },
   row: {
      flexDirection: 'row',
      borderBottom: '1px solid #ccc'
   },
   cell: {
      padding: 2,
      flex: 1
   }
})

type FieldsTypes = {
   Survey: string
   Assigned: string
   Due: string
   Date: string
   Range: string
   Dates: string
   Postponed: string
   Status: string
   Reason: string
}

type Tables = {
   ISM_ISPS_MLC: {
      ISP: {
         SMCI: FieldsTypes
         SMCR: FieldsTypes
         SMCP: FieldsTypes
      }
      ISPS: {
         ISSI: FieldsTypes
         ISSR: FieldsTypes
         ISSP: FieldsTypes
      }
      MLC: {
         MLI: FieldsTypes
         MLR: FieldsTypes
         MLP: FieldsTypes
      }
   }
   MARINE_CLASS: {
      Hull: {
         SS: FieldsTypes
         AS: FieldsTypes
         ITSS: FieldsTypes
         DS: FieldsTypes
      }
      Machinery: {
         ES: FieldsTypes
         ABS: FieldsTypes
         TS: FieldsTypes
      }
   }
   MARINE_STATUTORY: {
      Bulk_Cargoes: {
         BCR: FieldsTypes
         BCA: FieldsTypes
      }
      Dangerous_Goods: {
         DIR: FieldsTypes
      }
   }
}

const Table = ({ data }: { data: Record<string, FieldsTypes> }) => (
   <View>
      <View style={styles.tableHeader}>
         {['Survey', 'Assigned', 'Due Date', 'Range Dates', 'Postponed', 'Status', 'Reason'].map((head, idx) => (
            <Text style={styles.cell} key={idx}>
               {head}
            </Text>
         ))}
      </View>
      {Object.values(data).map((item, idx) => (
         <View style={styles.row} key={idx}>
            <Text style={styles.cell}>{item.Survey}</Text>
            <Text style={styles.cell}>{item.Assigned}</Text>
            <Text style={styles.cell}>{item.Due}</Text>
            <Text style={styles.cell}>{item.Range}</Text>
            <Text style={styles.cell}>{item.Postponed}</Text>
            <Text style={styles.cell}>{item.Status}</Text>
            <Text style={styles.cell}>{item.Reason}</Text>
         </View>
      ))}
   </View>
)

export const SurveyPDF = ({ tables }: { tables: Tables }) => (
   <Document>
      <Page size='A4' style={styles.page}>
         <Text style={styles.sectionTitle}>ISM/ISPS/MLC</Text>

         <Text>International Safety Management</Text>
         <Table data={tables.ISM_ISPS_MLC.ISP} />

         <Text>International Ship/Port Security</Text>
         <Table data={tables.ISM_ISPS_MLC.ISPS} />

         <Text>Maritime Labour Convention</Text>
         <Table data={tables.ISM_ISPS_MLC.MLC} />

         <Text style={styles.sectionTitle}>MARINE CLASS</Text>

         <Text>Hull</Text>
         <Table data={tables.MARINE_CLASS.Hull} />

         <Text>Machinery</Text>
         <Table data={tables.MARINE_CLASS.Machinery} />

         <Text style={styles.sectionTitle}>MARINE STATUTORY</Text>

         <Text>Bulk Cargoes</Text>
         <Table data={tables.MARINE_STATUTORY.Bulk_Cargoes} />

         <Text>Dangerous Goods (Reg.19)</Text>
         <Table data={tables.MARINE_STATUTORY.Dangerous_Goods} />
      </Page>
   </Document>
)
