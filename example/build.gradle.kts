plugins {
    id("application")
}

application {
    mainClass.set("platinum.example.Main")
}

dependencies {
    implementation(project(":lib"))
}