import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Text } from 'react-native';

interface SkillProps extends TouchableOpacityProps {
  skill: string;
};
export function SkillCard({ skill, ...rest }: SkillProps) {
  return (
    <TouchableOpacity style={styles.buttonSkill} {...rest}>
      <Text style={styles.textSkill}>{skill}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonSkill: {
    padding: 15,
    backgroundColor: '#1f1e25',
    borderRadius: 50,
    marginTop: 10
  },
  textSkill: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold'
  }
});
