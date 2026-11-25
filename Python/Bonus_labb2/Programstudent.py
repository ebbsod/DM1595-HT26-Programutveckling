from Student import Student
from Kurs import Kurs

class Programstudent(Student):
    def __init__(self, id, namn, program_id):
        super().__init__(id, namn, program_id)
        self.avklarade_kurser = []

    # Funktion för att lägga till en kurs i studentens lista av avklarade kurser
    def lägg_till_kurs(self, kurs):
        self.avklarade_kurser.append(kurs)

    # Funktion för att beräkna totalen av avklarade högskolepoäng
    def avklarade_poäng(self):
        total_poäng = 0
        for kurs in self.avklarade_kurser:
            total_poäng += kurs.get_högskolepoäng()
        return total_poäng

    # getters
    def get_avklarade_kurser(self):
        return self.avklarade_kurser

    def get_avklarade_poäng(self):
        return self.avklarade_poäng()

    def get_avklarad_procent(self, program):
        return self.avklarade_poäng() / program.get_obligatoriska_poäng() * 100
