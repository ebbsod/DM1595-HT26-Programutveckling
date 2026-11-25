class Program:
    def __init__(self, id, namn):
        self._id = id
        self._namn = namn
        self._obligatoriska_kurser = []
        self.programstudenter = []

   

    # funktioner
    def lägg_till_obligatorisk_kurs(self, kurs):
        self._obligatoriska_kurser.append(kurs)

    def lägg_till_student(self, student):
        self.programstudenter.append(student)

    #getters
    def get_id(self):
        return self._id

    def get_namn(self):
        return self._namn

    def get_obligatoriska_kurser(self):
        return list(self._obligatoriska_kurser)

    def get_obligatoriska_poäng(self):
        total_poäng = 0
        for kurs in self._obligatoriska_kurser:
            total_poäng += kurs.get_högskolepoäng()
        return total_poäng

    def get_studenter(self):
        return list(self.programstudenter)

    #utskrift
    def __str__(self):
        return f"{self._namn}:"


if __name__ == "__main__":
    from Kurs import Kurs

    kurs_a = Kurs(1, "DM1595", "Databasteknik", 7.5)
    program = Program(1, "Medieteknik")

    assert program.get_obligatoriska_poäng() == 0
    program.lägg_till_obligatorisk_kurs(kurs_a)
    assert program.get_obligatoriska_poäng() == 7.5

    print("Alla tester för Program godkända!")