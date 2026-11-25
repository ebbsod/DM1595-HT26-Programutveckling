
from Kurs import Kurs
from Student import Student


class MediaStudent(Student):
    def __init__(self, id, namn):
        super().__init__(id, namn)
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


def test_media_student():
    student = MediaStudent(1, "Alice")
    kurs1 = Kurs(1, "DM1595", "Databasteknik", 7.5)
    kurs2 = Kurs(2, "DM1600", "Programmering", 7.5)

    student.lägg_till_kurs(kurs1)
    student.lägg_till_kurs(kurs2)

    assert student.get_avklarade_poäng() == 15.0
    assert student.get_namn() == "Alice"
    assert student.get_id() == 1
    assert len(student.get_avklarade_kurser()) == 2

    print("Alla tester för MediaStudent-klassen har passerat.")

if __name__ == "__main__":
    test_media_student()