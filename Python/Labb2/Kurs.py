
class Kurs:
    def __init__(self, id, kurskod, namn, högskolepoäng):
        self.id = id
        self.kurskod = kurskod
        self.kursnamn = namn
        self.högskolepoäng = högskolepoäng

    #getters
    def get_id(self):
        return self.id

    def get_kurskod(self):
        return self.kurskod

    def get_kursnamn(self):
        return self.kursnamn

    def get_högskolepoäng(self):
        return self.högskolepoäng

    # snygg utskrift av kursobjektet
    def __str__(self):
        return f"Kurskod: {self.kurskod}, Kursnamn: {self.kursnamn}, Högskolepoäng: {self.högskolepoäng}"


def test_kurs():
    kurs = Kurs(1, "DM1595", "Databasteknik", 7.5)
    assert kurs.get_id() == 1
    assert kurs.get_kurskod() == "DM1595"   
    assert kurs.get_kursnamn() == "Databasteknik"
    assert kurs.get_högskolepoäng() == 7.5
    print("Alla tester för Kurs-klassen har passerat.")


if __name__ == "__main__":
    test_kurs()