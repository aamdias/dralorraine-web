# Lorraine patient relationships

Patient identity and longitudinal appointment history for Dra. Lorraine's practice.

## Language

**Paciente**: A person receiving care, with one identity and potentially many appointments over time.
_Avoid_: Lead, customer, client as separate identities

**Atendimento**: One scheduled or historical care encounter, either presencial or online. Its clinical status is independent of payment status.
_Avoid_: Transaction, intake

**Consulta online**: An intake submitted through the public remote-consultation booking flow. It may be linked to a patient and an appointment without replacing the submitted information.

**Retorno sugerido**: A manually recorded date to review or invite a patient back. It does not itself book an appointment.

**LTV**: The sum of known values of completed appointments for a patient. Canceled, missed and future appointments do not contribute.

**Consentimento para contato**: Explicit permission for relationship or promotional outreach, distinct from consent to care or personal-data processing.
