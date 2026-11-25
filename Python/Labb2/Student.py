
class Student:
    def __init__(self, id, namn):
        self.id = id
        self.namn = namn

    # getters
    def get_id(self):
        return self.id

    def get_namn(self):
        return self.namn

    # snygg utskrift av studentobjektet
    def __str__(self):
        return f"ID: {self.id}, Namn: {self.namn}"

def test_student():
    student = Student(1, "Alice")

    assert student.get_id() == 1
    assert student.get_namn() == "Alice"
    assert str(student) == "ID: 1, Namn: Alice"

    print("Alla tester för Student-klassen har passerat.")


if __name__ == "__main__":
    test_student()