const int trigPin = 2;
const int echoPin = 3;

long time;
int distance;

void setup() {
pinMode(trigPin, OUTPUT); 
pinMode(echoPin, INPUT); 
Serial.begin(9600); 
}

void loop() {
digitalWrite(trigPin, LOW);
delayMicroseconds(10);
digitalWrite(trigPin, HIGH);
delayMicroseconds(10);

digitalWrite(trigPin, LOW);
time = pulseIn(echoPin, HIGH);
distance= (time*0.034)/2;

if (distance <= 10) 
        {
        Serial.println (" Bay occupied ");
        Serial.print (" Distance= "); 
        Serial.println (distance);
        delay (500);
        }
else 
{
        Serial.println (" Bay available ");
        Serial.print (" Distance= "); 
        Serial.println (distance);
        delay (500);
}
}
