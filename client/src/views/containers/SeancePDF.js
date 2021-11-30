import React from 'react'
import { Page, Text, Image, Document, StyleSheet, View,PDFViewer } from '@react-pdf/renderer';
import { useQuery } from '@apollo/client';
import { getSeanceDetail } from '../../graphql/query'


// Create styles
const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    PDFViewer: {
        width: "1900px",
        height: "1200px"
    },
    image: {
        width: "150px",
        height: "80px"
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman',
    },
    header: {
        display: "flex",
        flexDirection: 'row',
        marginBottom: "10 px"
    },
    section1: {
        border: '1 px solid',
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    section: {
        border: '1 px solid',
    },
    title: {
        fontSize: 20,
        paddingTop: "25 px",
        marginLeft: "50 px"
    },
    subtitle: {
        fontSize: 16,
        marginTop: "20 px",
        marginBottom: "10 px"
    }

});

export const SeancePDF = (id) => {
    let identifiant = id.match.params.id

    const { loading, error, data } = useQuery(getSeanceDetail, { variables: { id: identifiant } })
    if (loading) return <p>Loading ...</p>;
    if (error) return `Error! ${error}`;
    console.log(data)

    // Data module
    const module = data.seance.module

    return (
        <PDFViewer style={styles.PDFViewer}>
            <Document>
                <Page size="A4" style={styles.body}>
                    <View style={styles.header}>
                        <Image src="/assets/images/logo_bge.png" style={styles.image} />
                        <Text style={styles.title}>
                            Seance journalière
                            </Text>
                    </View>
                    <View style={styles.section1}>
                        <View>
                            <Text style={styles.text}>
                                Module : {module.libelle}
                            </Text>
                            <Text style={styles.text}>
                                Réference : {module.reference}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.text}>
                                Formation : {module.formation.libelle}
                            </Text>
                            <Text style={styles.text}>
                                Réference : {module.formation.reference}
                            </Text>
                            <Text style={styles.text}>
                                Animateur : {module.animateurId.nom} {module.animateurId.prenom}
                            </Text>
                        </View>
                    </View>

                    <View >
                        <Text style={styles.subtitle}>
                            Infos
                      </Text>
                        <View style={styles.section1}>
                            <View>
                                <Text style={styles.text}>
                                    Durée : {data.seance.duree}
                                </Text>
                                <Text style={styles.text}>
                                    Date : {data.seance.date}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.text}>
                                    Type de seance : {data.seance.typeseance.libelle}
                                </Text>
                                <Text style={styles.text}>
                                    Description : {data.seance.typeseance.description}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <Text style={styles.subtitle}>
                        Contenu de la seance
                      </Text>
                    <View style={styles.section}>
                        <Text style={styles.text}>
                            Contenu : {data.seance.contenu}
                        </Text>
                        <Text style={styles.text}>
                            Contenu respecté : {data.seance.contenuRespecte}
                        </Text>
                        <Text style={styles.text}>
                            Commentaire : {data.seance.contenuCommentaire}
                        </Text>
                    </View>

                    <Text style={styles.subtitle}>
                        Timming
                      </Text>
                    <View style={styles.section}>
                        <Text style={styles.text}>
                            Horaires : {data.seance.timing}
                        </Text>
                        <Text style={styles.text}>
                            Horaires respecté : {data.seance.timingRespecte}
                        </Text>
                        <Text style={styles.text}>
                            Commentaire : {data.seance.timingCommentaire}
                        </Text>
                    </View>
                </Page>
                <Page size="A4" style={styles.body}>

                    <Text style={styles.subtitle}>
                        Condition
                      </Text>
                    <View style={styles.section}>
                        <Text style={styles.text}>
                            Condition : {data.seance.condition}
                        </Text>
                        <Text style={styles.text}>
                            Condition respecté : {data.seance.conditionRespecte}
                        </Text>
                        <Text style={styles.text}>
                            Commentaire : {data.seance.conditionCommentaire}
                        </Text>
                    </View>

                    <Text style={styles.subtitle}>
                        Evaluation
                      </Text>
                    <View style={styles.section}>
                        <Text style={styles.text}>
                            Evaluation : {data.seance.evaluation}
                        </Text>
                        <Text style={styles.text}>
                            Evaluation respecté : {data.seance.evaluationRespecte}
                        </Text>
                        <Text style={styles.text}>
                            Commentaire : {data.seance.evaluationCommentaire}
                        </Text>
                    </View>

                    <Text style={styles.subtitle}>
                        Compréhension
                      </Text>
                    <View style={styles.section}>
                        <Text style={styles.text}>
                            Compréhension : {data.seance.comprehension}
                        </Text>
                        <Text style={styles.text}>
                            Compréhension respecté : {data.seance.evaluationRespecte}
                        </Text>
                        <Text style={styles.text}>
                            Commentaire : {data.seance.evaluationCommentaire}
                        </Text>
                    </View>
                </Page>
                <Page size="A4" style={styles.body}>

                    <Text style={styles.subtitle}>
                        Participation
                      </Text>
                    <View style={styles.section}>
                        <Text style={styles.text}>
                            Participation respectée: {data.seance.participationRespecte}
                        </Text>
                        <Text style={styles.text}>
                            Assiduité : {data.seance.assiduite}
                        </Text>
                        <Text style={styles.text}>
                            Vie de groupe : {data.seance.vieGroupe}
                        </Text>
                    </View>

                    <Text style={styles.subtitle}>
                        Commentaire Libre
                      </Text>
                    <View style={styles.section}>
                        <Text style={styles.text}>
                            Commentaire : {data.seance.commentaireLibre}
                        </Text>
                    </View>
                </Page>
            </Document>
        </PDFViewer >
    )
}

