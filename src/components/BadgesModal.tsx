import { View, Text, Modal, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { BagdeModalProps } from '@/types/BagdeModalProps'

const BadgesModal = ({visible, onClose, badges}: BagdeModalProps) => {
  return (
    <Modal
        visible={visible}
        transparent
        animationType='fade'
    >
        <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>

                <Text style={styles.modalTitle}>Minhas Badges</Text>

                <ScrollView style={styles.badgeList} contentContainerStyle={{ paddingBottom: 20 }}>
                    {badges.map((badge, index)=>(
                        <View key={index} style={styles.badgeItem}>
                            <Text>{badge}</Text>
                        </View>
                    ))}
                </ScrollView>

                <TouchableOpacity
                    onPress={onClose}
                    style={styles.closeButton}
                >
                    <Text style={{ color: 'white'}}>Fechar</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
  )
}

export default BadgesModal

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '80%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  badgeList: {
    maxHeight: 300,
  },
  badgeItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  closeButton: {
    marginTop: 12,
    backgroundColor: '#7a22ce',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});