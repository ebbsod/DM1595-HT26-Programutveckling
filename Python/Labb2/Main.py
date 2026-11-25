import sqlite3
from Kurs import Kurs
from Student import Student
from mediastudent import MediaStudent


# kickar igång vår databas med tabeller
con = sqlite3.connect('medieteknik.sqlite')
cur = con.cursor()

# läs in kurser

def läs_in_tabell(cur, tabellnamn, klass):
    objekt_dict = {}
    cur.execute(f"SELECT * FROM {tabellnamn}")
    for row in cur.fetchall():
        objekt = klass(*row)
        objekt_dict[objekt.get_id()] = objekt
    return objekt_dict

# koppla ihop student med rätt kursregistrering
def koppla_registreringar(cur, mediestudenter, kurser):
    cur.execute("SELECT * FROM Kursregistrering")
    for row in cur.fetchall():
        student_id, kurs_id = row
        student = mediestudenter[student_id]
        kurs = kurser[kurs_id]
        student.lägg_till_kurs(kurs)


kurser = läs_in_tabell(cur, "Kurs", Kurs)
mediestudenter = läs_in_tabell(cur, "Student", MediaStudent)
koppla_registreringar(cur, mediestudenter, kurser)


# definierar obligatoirska poäng från kursplanen

obligatoriska_poäng = 0
for kurs in kurser.values():
    obligatoriska_poäng += kurs.get_högskolepoäng()

# skriver ut alla studenter och deras avklarade poäng
print("Antal obligatoriska poäng", obligatoriska_poäng)
print("--------------------------------")
for student in mediestudenter.values():
    print(f"{student.get_namn()} har avklarat {student.get_avklarade_poäng()/obligatoriska_poäng*100:.1f}% ")

con.close()