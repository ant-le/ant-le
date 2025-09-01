# Data

While in the future potentially mitigating to a database, the project will
first be deployed statically. Hence, data will be served client-sided from
fixed type-script definitions. This should faciliate the later mitigation
to a database with APIs. The relevant data will be:

1. Blogpost
    - creationDate: Date
    - title: String
    - image: String/Filepath
    - lables: String[]
    - post: String/Filepath
    - categories: <"science" | "running" | "music">

2. RunningPBs
    - eventDate: Date
    - eventLocation: String
    - distance: <"5k" | "10k" | "Half Marathon" | "Marathon" >
    - usedShoe: String

3. FriendsData:
    - name: String
    - image: String/Filepath
    - text: String
    - role: String

4. RunningTraining
    - date: Date
    - distance: number
