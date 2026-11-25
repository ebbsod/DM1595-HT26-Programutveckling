class Student:
    def __init__(self, id, namn, program_id):
        self.id = id
        self.namn = namn
        self.program_id = program_id

    # utskrift
    def __str__(self):
        return f"StudentID: {self.id}, Studentnamn: {self.namn}, program ID: {self.program_id}"
        
    # getters
    def get_id(self):
        return self.id

    def get_namn(self):
        return self.namn

    def get_program_id(self):
        return self.program_id

    
def test_student():
    student = Student(1, "Mike", 2)

    assert student.get_id() == 1
    assert student.get_namn() == "Mike"
    assert student.get_program_id() == 2

    print("Alla tester för Student-klassen har passerat.")


if __name__ == "__main__":
    test_student()