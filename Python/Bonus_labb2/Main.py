import sqlite3
from Kurs import Kurs
from Student import Student
from Programstudent import Programstudent
from Program import Program



# kickar igång vår databas med tabeller
con = sqlite3.connect('eecs.sqlite')
cur = con.cursor()

#läs in databasen och konvertera till dict med id som nyckel
def läs_in_tabell(cur, tabellnamn, klass):
    objekt_dict = {}
    cur.execute(f"SELECT * FROM {tabellnamn}")
    for row in cur.fetchall():
        objekt = klass(*row)
        objekt_dict[objekt.get_id()] = objekt # sätter id som key och info som value
    return objekt_dict

Kurser = läs_in_tabell(cur, "Kurs", Kurs)
Studenter = läs_in_tabell(cur, "Student", Programstudent)
Programmen = läs_in_tabell(cur, "Program", Program)

# koppla ihop student till program
def koppla_studenter_till_program(studenter, program):
    for student in studenter.values():
        rätt_program = program[student.get_program_id()]
        rätt_program.lägg_till_student(student)

#k
def koppla_registreringar(cur, studenter, kurser):
    cur.execute("SELECT * FROM Kursregistrering")
    for student_id, kurs_id in cur.fetchall():
        student = studenter[student_id]
        kurs = kurser[kurs_id]
        student.lägg_till_kurs(kurs)

def koppla_obligatoriska_kurser(cur, program, kurser):
    cur.execute("SELECT * FROM Obligatoriska_kurser")
    for kurs_id, program_id in cur.fetchall():
        program[program_id].lägg_till_obligatorisk_kurs(kurser[kurs_id])


# koppla ihop all data 
koppla_registreringar(cur, Studenter, Kurser)
koppla_studenter_till_program(Studenter, Programmen)
koppla_obligatoriska_kurser(cur, Programmen, Kurser)

con.close()

# skriv ut varje program och studenter
for program in Programmen.values():
    print(program)

    for student in program.get_studenter():
        procent = student.get_avklarad_procent(program)
        print(f"  {student.get_namn()}: {procent:.1f}%")