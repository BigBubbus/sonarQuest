package com.viadee.sonarQuest.entities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "Skill")
public class Skill {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "value")
    private Long value;

    @JsonIgnore
    @ManyToMany(mappedBy = "skills", cascade = CascadeType.ALL)
    private List<AvatarClass> avatarClasses;

    public Skill() {
    }

    public Skill(final String name, final String type, final Long value) {
        this.name = name;
        this.type = type;
        this.value = value;
    }

    public Skill(final String name, final String type, final Long value, final List<AvatarClass> avatarClasses) {
        this.name = name;
        this.type = type;
        this.value = value;
        this.avatarClasses = avatarClasses;
    }

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(final String type) {
        this.type = type;
    }

    public Long getValue() {
        return value;
    }

    public void setValue(final Long value) {
        this.value = value;
    }

    public List<AvatarClass> getAvatarClasses() {
        return avatarClasses;
    }

    public void setAvatarClasses(final List<AvatarClass> avatarClasses) {
        this.avatarClasses = avatarClasses;
    }
}
