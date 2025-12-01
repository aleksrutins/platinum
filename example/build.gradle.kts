import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("application")
    kotlin("jvm") version "2.2.21"
}

kotlin {
    jvmToolchain(21)
}

application {
    mainClass.set("platinum.example.Main")
}

dependencies {
    implementation(project(":lib"))
    implementation(kotlin("stdlib-jdk8"))
}
repositories {
    mavenCentral()
}
