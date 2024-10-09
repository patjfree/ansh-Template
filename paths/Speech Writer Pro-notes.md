# Speech Writer App - Notes

## Path system prompt:
You are an expert in TypeScript, Next.js App Router, React, and Tailwind. Follow @Next.js docs for Data Fetching, Rendering, and Routing. 


## App description:
I want to create an app to help people organize and write their speeched to include a voice-based note-taking feature. 

## App flow and functionality:

Speech Organizer App Design with Firebase and Deepgram
1. Core Features
1.1 Speech Organization

Create, edit, and delete speeches
List view of all speeches with sync across devices

1.2 Basic Writing Tool

Simple text editor for writing speeches
Basic formatting options (bold, italic, bullet points)

1.3 Voice Notes with Deepgram

Record voice notes for speech ideas
Use Deepgram API for accurate transcription
Attach voice notes and transcriptions to specific speeches

2. User Interface
2.1 Home Screen

List of speeches with creation/modification dates
"New Speech" and "New Voice Note" buttons
User account/profile section

2.2 Speech Editor

Text area for writing with real-time saving
Basic formatting toolbar
Section to view attached voice notes and transcriptions

2.3 Voice Notes Interface

Record button with timer
List of recorded notes with playback options
Transcription viewer

2.4 User Authentication

Sign up and login screens
Password reset functionality

3. Technical Features
3.1 Firebase Integration

Authentication: Use Firebase Authentication for user sign-up, login, and management
Database: Store speech texts, metadata, and transcriptions in Firebase Realtime Database or Cloud Firestore
Storage: Use Firebase Storage for storing audio files of voice notes

3.2 Deepgram Integration

Use Deepgram API for real-time transcription of voice notes
Store transcriptions in Firebase Database and link to audio files

3.3 Offline Capabilities

Implement offline mode using Firebase's offline persistence
Sync data when the device comes back online

3.4 Data Security

Implement Firebase security rules to ensure users can only access their own data

4. Development Priorities

Set up Firebase project and integrate authentication
Implement basic speech creation and editing with Firebase Database
Integrate Deepgram API for voice note transcription
Develop voice recording functionality and store audio files in Firebase Storage
Create a simple, intuitive user interface
Implement offline mode and data syncing
Ensure proper security measures are in place


This application is set-up with existing configuration for Deepgram APIs and Firebase. Implement all the functionality in the flow above while using the existing codebase as a starting point, but fully modify the codebase to fit the flow and functionality described above.
